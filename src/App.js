import './App.css';

function App() {
    return (
        <div className="App">
            <Subject></Subject>
        </div>
    );
}

// 하나의 최상위 태그만 사용해야함
function Subject() {
    return (
        <header>
            <h1>WEB</h1>
            world wide web!
        </header>
    );
}

export default App;
