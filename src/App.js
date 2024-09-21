import './App.css';

// 하나의 최상위 태그만 사용해야함
function Headder(props) {
    return (
        <header>
            <h1>
                <a
                    herf="/"
                    onClick={(event) => {
                        event.preventDefault();
                        props.onChangeMode();
                    }}
                >
                    {props.title}
                </a>
            </h1>
        </header>
    );
}

const Nav = (props) => {
    const lis = [];

    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(
            <li key={t.id}>
                <a
                    id={t.id}
                    href={'/read/' + t.id}
                    onClick={(event) => {
                        event.preventDefault();
                        props.onChangeMode(event.target.id);
                    }}
                >
                    {t.title}
                </a>
            </li>
        );
    }
    return (
        <nav>
            <ol>{lis}</ol>
        </nav>
    );
};

const Article = (props) => {
    return (
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    );
};

const App = () => {
    const topics = [
        { id: 1, title: 'html', body: 'html is ...' },
        { id: 2, title: 'css', body: 'css is ...' },
        { id: 3, title: 'javascript', body: 'javascript is ...' },
    ];
    return (
        <div>
            <Headder
                title="REACT"
                onChangeMode={() => {
                    alert('Header');
                }}
            ></Headder>
            <Nav
                topics={topics}
                onChangeMode={(id) => {
                    alert(id);
                }}
            ></Nav>
            <Article title="Welcome" body="Hello, WEB"></Article>
            <Article title="Hi" body="Hello, REACT"></Article>
        </div>
    );
};

export default App;
