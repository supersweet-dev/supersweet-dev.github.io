import React, { useEffect, useRef, useState } from 'react';

type PlayerColor = 'white' | 'black';

interface GameState {
	moves: string[];
	board: string; // FEN string
	current_turn: PlayerColor;
	color_assignment: Record<'p1' | 'p2', PlayerColor> | {};
	status: 'waiting' | 'ongoing' | 'finished';
}

const DEFAULT_BACKEND = 'http://localhost:8000';

export default function ChessGame({ backendUrl }: { backendUrl?: string }) {
	const base = backendUrl || DEFAULT_BACKEND;
	const [gameId, setGameId] = useState<string>('');
	const [localGameIdInput, setLocalGameIdInput] = useState<string>('');
	const [playerId, setPlayerId] = useState<'p1' | 'p2' | null>(null);
	const [wsConnected, setWsConnected] = useState(false);
	const wsRef = useRef<WebSocket | null>(null);
	const [gameState, setGameState] = useState<GameState | null>({
		moves: [],
		board: '8/8/8/8/8/8/8/8',
		current_turn: 'white',
		color_assignment: {},
		status: 'waiting',
	});
	const [messages, setMessages] = useState<string[]>([]);
	const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
	const [highlightedSquares, setHighlightedSquares] = useState<string[]>([]);
	const [playerColor, setPlayerColor] = useState<PlayerColor | null>(null);

	// Get current player color
	const isPlayerTurn = gameState?.current_turn === playerColor;

	// Helper functions
	function fenToBoard(fen: string) {
		// Handle empty or invalid FEN
		if (!fen || typeof fen !== 'string') {
			return Array(8)
				.fill(null)
				.map(() => Array(8).fill(null));
		}

		// Take only the piece placement part (before first space)
		const fenPart = fen.split(' ')[0];
		const rows = fenPart.split('/');
		const board: (string | null)[][] = [];

		for (let r = 0; r < 8; r++) {
			const rowStr = rows[r] || '';
			const row: (string | null)[] = [];
			let col = 0;

			for (const ch of rowStr) {
				if (col >= 8) break;

				if (/[1-8]/.test(ch)) {
					const emptySquares = parseInt(ch, 10);
					for (let i = 0; i < emptySquares && col < 8; i++) {
						row.push(null);
						col++;
					}
				} else {
					row.push(ch);
					col++;
				}
			}

			// Fill remaining columns with null if needed
			while (col < 8) {
				row.push(null);
				col++;
			}

			board.push(row);
		}

		// Ensure we have exactly 8 rows
		while (board.length < 8) {
			board.push(Array(8).fill(null));
		}

		return board.slice(0, 8);
	}

	function squareToIdx(sq: string) {
		if (sq.length !== 2) return null;
		const file = sq[0];
		const rank = parseInt(sq[1], 10);
		const col = file.charCodeAt(0) - 'a'.charCodeAt(0);
		const row = 8 - rank;
		if (col < 0 || col > 7 || row < 0 || row > 7) return null;
		return { row, col };
	}

	function idxToSquare(row: number, col: number) {
		return String.fromCharCode('a'.charCodeAt(0) + col) + (8 - row);
	}

	function renderSquareContent(piece: string | null) {
		if (!piece) return null;

		const pieceSymbols: Record<string, string> = {
			P: '♟',
			N: '♞',
			B: '♝',
			R: '♜',
			Q: '♛',
			K: '♚',
			p: '♟',
			n: '♞',
			b: '♝',
			r: '♜',
			q: '♛',
			k: '♚',
		};

		return pieceSymbols[piece] || piece;
	}

	async function hostGame() {
		try {
			const res = await fetch(`${base}/host`, { method: 'POST' });
			const j = await res.json();
			setGameId(j.game_id);
			setLocalGameIdInput(j.game_id);
			setPlayerId('p1');
			connectWS(j.game_id, 'p1');
		} catch (err) {
			addMessage('Failed to host: ' + String(err));
		}
	}

	async function joinGame() {
		const gid = localGameIdInput.trim();
		if (!gid) return addMessage('Enter game ID');
		try {
			const res = await fetch(`${base}/join/${gid}`);
			if (!res.ok) throw new Error(await res.text());
			setGameId(gid);
			setPlayerId('p2');
			connectWS(gid, 'p2');
		} catch (err) {
			addMessage('Failed to join: ' + String(err));
		}
	}

	function connectWS(gid: string, pid: 'p1' | 'p2') {
		if (wsRef.current) wsRef.current.close();

		const wsUrl = `${base.replace(/^http/, 'ws')}/ws/${gid}/${pid}`;
		const ws = new WebSocket(wsUrl);
		wsRef.current = ws;

		ws.onopen = () => {
			setWsConnected(true);
			addMessage('Connected to game');
		};

		ws.onclose = () => {
			setWsConnected(false);
			addMessage('Disconnected from game');
		};

		ws.onerror = (err) => {
			addMessage('Connection error');
			console.error('WebSocket error:', err);
		};

		ws.onmessage = (ev) => {
			try {
				const data = JSON.parse(ev.data);

				if (data.type === 'notification') {
					addMessage(data.message);
				} else if (data.type === 'color_assignment') {
					setPlayerColor(data.color);
					addMessage(`You are playing as ${data.color}`);
				} else if (data.type === 'game_state') {
					// Ensure board is always a valid string
					const safeBoard =
						typeof data.board === 'string'
							? data.board
							: '8/8/8/8/8/8/8/8';
					setGameState({
						...data,
						board: safeBoard,
					});
					console.log('Game state updated:', data);
					setSelectedSquare(null);
					setHighlightedSquares([]);
				} else if (data.type === 'legal_moves_response') {
					if (Array.isArray(data.moves)) {
						setHighlightedSquares(data.moves);
					}
				} else if (data.type === 'game_over') {
					addMessage(`Game over: ${data.reason}`);
					if (data.winner === playerId) {
						addMessage('You won!');
					} else if (data.winner) {
						addMessage('You lost!');
					} else {
						addMessage('Game ended in a draw');
					}
				}
			} catch (err) {
				console.error('Message parse error:', err);
			}
		};
	}

	function addMessage(msg: string) {
		setMessages((prev) => [
			...prev,
			`${new Date().toLocaleTimeString()}: ${msg}`,
		]);
	}

	function sendMove(move: string) {
		if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)
			return;
		wsRef.current.send(JSON.stringify({ type: 'move', move }));
		setSelectedSquare(null);
		setHighlightedSquares([]);
	}

	function surrender() {
		if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)
			return;
		wsRef.current.send(JSON.stringify({ type: 'surrender' }));
	}

	function handleSquareClick(row: number, col: number) {
		if (!playerId || !gameState || !isPlayerTurn) {
			addMessage('Please wait for your turn');
			return;
		}

		const square = idxToSquare(row, col);

		// If clicking the same square, deselect
		if (selectedSquare === square) {
			setSelectedSquare(null);
			setHighlightedSquares([]);
			return;
		}
		if (selectedSquare && highlightedSquares.includes(square)) {
			sendMove(selectedSquare + square);
		}

		// Ask the backend for legal moves
		wsRef.current?.send(
			JSON.stringify({
				type: 'legal_moves',
				square: square,
			})
		);
		setSelectedSquare(square);
		return;

		// If we have a selected piece and click on a highlighted square
	}

	useEffect(() => {
		return () => {
			if (wsRef.current) wsRef.current.close();
		};
	}, []);

	return (
		<div
			style={{
				fontFamily: 'sans-serif',
				maxWidth: 900,
				margin: '12px auto',
			}}
		>
			<h2>Chess Game</h2>

			{/* Connection Status */}
			<div
				style={{
					marginBottom: '1rem',
					padding: '0.5rem',
					background: '#f0f0f0',
					borderRadius: '4px',
				}}
			>
				<div>Backend: {base}</div>
				<div>Game ID: {gameId || 'Not connected'}</div>
				<div>
					Player:{' '}
					{playerId
						? `${playerId} (${playerColor})`
						: 'Not connected'}
				</div>
				<div>Status: {wsConnected ? 'Connected' : 'Disconnected'}</div>
				<div>
					Turn: {isPlayerTurn ? 'Your turn' : 'Waiting for opponent'}
				</div>
			</div>

			{/* Game Controls */}
			<div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
				<button onClick={hostGame} disabled={!!gameId}>
					Host Game
				</button>
				<div style={{ display: 'flex', gap: '0.5rem' }}>
					<input
						placeholder="Enter game ID"
						value={localGameIdInput}
						onChange={(e) => setLocalGameIdInput(e.target.value)}
						disabled={!!gameId}
					/>
					<button onClick={joinGame} disabled={!!gameId}>
						Join Game
					</button>
				</div>
				<button
					onClick={surrender}
					disabled={!wsConnected || !gameId}
					style={{ background: '#ff4444', color: 'white' }}
				>
					Surrender
				</button>
			</div>

			{/* Chess Board */}
			<div style={{ margin: '1rem 0' }}>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(8, 50px)',
						gridTemplateRows: 'repeat(8, 50px)',
						gap: '1px',
						background: '#333',
						padding: '4px',
						borderRadius: '4px',
					}}
				>
					{fenToBoard(gameState!.board).map((row, rIdx) =>
						row.map((cell, cIdx) => {
							const isLight = (rIdx + cIdx) % 2 === 0;
							const square = idxToSquare(rIdx, cIdx);
							const isSelected = selectedSquare === square;
							const isHighlighted =
								highlightedSquares.includes(square);

							return (
								<div
									key={`${rIdx}-${cIdx}`}
									onClick={() =>
										handleSquareClick(rIdx, cIdx)
									}
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										background: isSelected
											? '#ffeb3b'
											: isHighlighted
											? '#a5d6a7'
											: isLight
											? '#f0d9b5'
											: '#b58863',
										color:
											cell && /[A-Z]/.test(cell)
												? '#fff'
												: '#000',
										fontWeight: 'bold',
										fontSize: '30px',
										cursor: isPlayerTurn
											? 'pointer'
											: 'default',
										position: 'relative',
									}}
								>
									{renderSquareContent(cell)}
									{/* File and rank labels */}
									{(rIdx === 7 || cIdx === 0) && (
										<span
											style={{
												position: 'absolute',
												fontSize: '10px',
												color: isLight
													? '#000'
													: '#fff',
												...(rIdx === 7
													? {
															bottom: '2px',
															right: '2px',
													  }
													: {}),
												...(cIdx === 0
													? {
															top: '2px',
															left: '2px',
													  }
													: {}),
											}}
										>
											{rIdx === 7 ? square[0] : ''}
											{cIdx === 0 ? square[1] : ''}
										</span>
									)}
								</div>
							);
						})
					)}
				</div>
			</div>

			{/* Move History */}
			{gameState?.moves.length ? (
				<div style={{ margin: '1rem 0' }}>
					<h3>Move History</h3>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							gap: '0.5rem',
							maxHeight: '200px',
							overflowY: 'auto',
						}}
					>
						{gameState.moves.map((move, i) => (
							<div
								key={i}
								style={{
									background: i % 2 ? '#f5f5f5' : 'white',
									padding: '0.25rem',
								}}
							>
								{i % 2 === 0 ? Math.floor(i / 2) + 1 + '.' : ''}{' '}
								{move}
							</div>
						))}
					</div>
				</div>
			) : null}

			{/* Messages */}
			<div style={{ margin: '1rem 0' }}>
				<h3>Messages</h3>
				<div
					style={{
						background: '#111',
						color: '#fff',
						padding: '1rem',
						borderRadius: '4px',
						maxHeight: '200px',
						overflowY: 'auto',
						fontFamily: 'monospace',
					}}
				>
					{messages.length ? (
						messages.map((msg, i) => (
							<div key={i} style={{ marginBottom: '0.25rem' }}>
								{msg}
							</div>
						))
					) : (
						<div>No messages yet</div>
					)}
				</div>
			</div>
		</div>
	);
}
