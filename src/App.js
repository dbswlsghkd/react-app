import './App.css';

const App = () => {
    return (
        <div className="App">
            <Subject></Subject>
            <TOC></TOC>
            <Content></Content>
        </div>
    );
};

const Content = () => {
    return (
        <article>
            <h2>HTML</h2>
            HTML is HyperText Markup Language.
        </article>
    );
};

const TOC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <a href="1.html">HTML</a>
                </li>
                <li>
                    <a href="2.html">CSS</a>
                </li>
                <li>
                    <a href="3.html">JavaScript</a>
                </li>
            </ul>
        </nav>
    );
};

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
