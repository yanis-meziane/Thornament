import { useState } from 'react';
import './CreateTournamentModal.css';

export default function CreateTournamentModal({ isOpen, onClose, onCreate }) {
    const [tournamentName, setTournamentName] = useState('');
    const [tournamentDescription, setTournamentDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tournamentName.trim()) {
            onCreate(tournamentName, tournamentDescription);
            setTournamentName('');
            setTournamentDescription('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Créer un nouveau tournoi</h2>
                
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Nom du tournoi"
                            value={tournamentName}
                            onChange={(e) => setTournamentName(e.target.value)}
                            autoFocus
                        />
                    </div>
                    
                    <div className="form-group">
                        <textarea
                            className="form-input"
                            placeholder="Description du tournoi (optionnel)"
                            value={tournamentDescription}
                            onChange={(e) => setTournamentDescription(e.target.value)}
                            rows="4"
                        />
                    </div>
                    
                    <button type="submit" className="btn-create-tournament">
                        Créer le nouveau tournoi
                    </button>
                </form>
            </div>
        </div>
    );
}
