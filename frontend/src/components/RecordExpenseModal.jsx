import '../index.css';

function RecordExpenseModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-card glass modal-relative">
        {/* CLOSE BUTTON – TOP RIGHT */}
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <h3 className="modal-title">Record New Expense</h3>

        <p className="modal-sub">
          Add details about your expense to track your spending better.
        </p>

        <label>Description</label>
        <input
          className="modal-input"
          placeholder="e.g. Grocery Shopping"
        />

        <label>Amount</label>
        <input
          type="number"
          className="modal-input"
          placeholder="₹ 0.00"
        />

        <div className="modal-row">
          <div>
            <label>Category</label>
            <select className="modal-input" defaultValue="">
              <option value="" disabled>
                Select a category
              </option>
              <option>Food</option>
              <option>Transport</option>
              <option>Utilities</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Date</label>
            <input type="date" className="modal-input" />
          </div>
        </div>

        <label>Notes (Optional)</label>
        <textarea
          className="modal-input textarea"
          placeholder="Add any additional details..."
        />

        <div className="modal-actions">
          <button className="ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="danger">Save</button>
        </div>
      </div>
    </div>
  );
}

export default RecordExpenseModal;
