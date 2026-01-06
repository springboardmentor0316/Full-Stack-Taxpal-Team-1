function App() {
  return (
    <div className="card">
      <LeftSection />
      <LoginForm />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
