// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title MiniBet - A decentralized peer-to-peer betting smart contract
/// @notice Allows users to create, join, and resolve bets on the BNB Smart Chain
/// @dev Deployed on BSC Testnet at 0x68dd09fD8825134A2A506D022Eff387C7311738E

contract MiniBet {
    struct Bet {
        address creator;
        address opponent;
        uint256 amount;
        bool isOpen;
        bool isResolved;
        address winner;
        string description;
    }

    Bet[] public bets;

    event BetCreated(uint256 indexed betId, address indexed creator, uint256 amount, string description);
    event BetJoined(uint256 indexed betId, address indexed opponent);
    event BetResolved(uint256 indexed betId, address indexed winner, uint256 payout);

    /// @notice Creates a new bet with a description and locks the creator's wager in the contract
    /// @dev The msg.value is stored as the bet amount; opponent is initially the zero address
    /// @param _description A short text describing what the bet is about
    function createBet(string calldata _description) external payable {
        require(msg.value > 0, "Bet amount must be greater than 0");
        require(bytes(_description).length > 0, "Description cannot be empty");

        bets.push(Bet({
            creator: msg.sender,
            opponent: address(0),
            amount: msg.value,
            isOpen: true,
            isResolved: false,
            winner: address(0),
            description: _description
        }));

        emit BetCreated(bets.length - 1, msg.sender, msg.value, _description);
    }

    /// @notice Allows another user to join an open bet by matching the creator's wager
    /// @dev The opponent must send exactly the same amount as the creator's original bet
    /// @param _betId The index of the bet to join in the bets array
    function joinBet(uint256 _betId) external payable {
        require(_betId < bets.length, "Bet does not exist");
        Bet storage bet = bets[_betId];
        require(bet.isOpen, "Bet is not open");
        require(bet.opponent == address(0), "Bet already has an opponent");
        require(msg.sender != bet.creator, "Cannot join your own bet");
        require(msg.value == bet.amount, "Must match the bet amount");

        bet.opponent = msg.sender;

        emit BetJoined(_betId, msg.sender);
    }

    /// @notice Resolves a bet and sends the entire pot to the declared winner
    /// @dev Only the bet creator can resolve; winner must be either the creator or the opponent
    /// @param _betId The index of the bet to resolve in the bets array
    /// @param _winner The address of the winner who will receive the full pot (2x the bet amount)
    function resolveBet(uint256 _betId, address _winner) external {
        require(_betId < bets.length, "Bet does not exist");
        Bet storage bet = bets[_betId];
        require(msg.sender == bet.creator, "Only the creator can resolve");
        require(bet.opponent != address(0), "No opponent has joined yet");
        require(!bet.isResolved, "Bet already resolved");
        require(_winner == bet.creator || _winner == bet.opponent, "Winner must be a participant");

        bet.isResolved = true;
        bet.isOpen = false;
        bet.winner = _winner;

        uint256 payout = bet.amount * 2;
        (bool sent, ) = _winner.call{value: payout}("");
        require(sent, "Failed to send payout");

        emit BetResolved(_betId, _winner, payout);
    }

    /// @notice Returns the total number of bets that have been created
    /// @dev Used by the frontend to iterate through all bets
    /// @return The length of the bets array
    function getBetsCount() external view returns (uint256) {
        return bets.length;
    }
}
