import '../index.css';

function RecordIncomeModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-card glass modal-relative">
        {/* CLOSE BUTTON – TOP RIGHT */}
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <h3 className="modal-title">Record New Income</h3>

        <p className="modal-sub">
          Add details about your income to track your finances better.
        </p>

        <label>Description</label>
        <input
          className="modal-input"
          placeholder="e.g. Web Design Project"
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
              <option>Salary</option>
              <option>Freelance</option>
              <option>Business</option>
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
          <button className="primary">Save</button>
        </div>
      </div>
    </div>
  );
}

export default RecordIncomeModal;
