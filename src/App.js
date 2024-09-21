import './App.css';
// 훅 은 리액트에서 제공하는 함수
import { useState } from 'react';

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
                        props.onChangeMode(Number(event.target.id));
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

const Create = (props) => {
    return (
        <article>
            <h2>Create</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const title = event.target.title.value;
                    const body = event.target.body.value;
                    console.log(title, 'title');
                    console.log(body, 'body');
                    props.onCreate(title, body);
                }}
            >
                <p>
                    <input type="text" name="title" placeholder="title"></input>
                </p>
                <p>
                    <textarea name="body" placeholder="body"></textarea>
                </p>
                <p>
                    <input type="submit" value="Create"></input>
                </p>
            </form>
        </article>
    );
};

const Update = (props) => {
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);
    return (
        <article>
            <h2>Update</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const title = event.target.title.value;
                    const body = event.target.body.value;
                    console.log(title, 'title');
                    console.log(body, 'body');
                    props.onUpdate(title, body);
                }}
            >
                <p>
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        value={title}
                        // 값을 입력할때마다 호출함
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    ></input>
                </p>
                <p>
                    <textarea
                        name="body"
                        placeholder="body"
                        value={body}
                        onChange={(event) => {
                            setBody(event.target.value);
                        }}
                    ></textarea>
                </p>
                <p>
                    <input type="submit" value="Update"></input>
                </p>
            </form>
        </article>
    );
};

const App = () => {
    // const _mode = useState('WELCOME');
    // console.log(_mode, '_mode');
    // const mode = _mode[0];
    // const setMode = _mode[1];

    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);

    const [topics, setTopics] = useState([
        { id: 1, title: 'html', body: 'html is ...' },
        { id: 2, title: 'css', body: 'css is ...' },
        { id: 3, title: 'javascript', body: 'javascript is ...' },
    ]);
    let content = null;
    let contextControl = null;

    if (mode === 'WELCOME') {
        content = <Article title="Welcome" body="Hello, WEB"></Article>;
    } else if (mode === 'READ') {
        let title,
            body = null;
        for (let i = 0; i < topics.length; i++) {
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Article title={title} body={body}></Article>;
        contextControl = (
            <li>
                <a
                    herf={'/update/' + id}
                    onClick={(event) => {
                        event.preventDefault();
                        setMode('UPDATE');
                    }}
                >
                    Update
                </a>
            </li>
        );
    } else if (mode === 'CREATE') {
        content = (
            <Create
                onCreate={(_title, _body) => {
                    const newTopic = { id: nextId, title: _title, body: _body };
                    // topics의 복제본
                    const newTopics = [...topics];
                    // 복제본에 데이터 추가
                    newTopics.push(newTopic);
                    // 복제본을 비교해서 다르면 랜더링 시켜줌
                    setTopics(newTopics);
                    setMode('READ');
                    setId(nextId);
                    setNextId(nextId + 1);
                }}
            ></Create>
        );
    } else if (mode === 'UPDATE') {
        let title,
            body = null;
        for (let i = 0; i < topics.length; i++) {
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = (
            <Update
                title={title}
                body={body}
                onUpdate={(title, body) => {
                    const newTopics = [...topics];
                    const updateTopic = { id, title, body };
                    for (let i = 0; i < newTopics.length; i++) {
                        if (newTopics[i].id === id) {
                            newTopics[i] = updateTopic;
                            break;
                        }
                    }

                    setTopics(newTopics);
                    setMode('READ');
                }}
            ></Update>
        );
    }
    return (
        <div>
            <Headder
                title="REACT"
                onChangeMode={() => {
                    setMode('WELCOME');
                }}
            ></Headder>
            <Nav
                topics={topics}
                onChangeMode={(_id) => {
                    setMode('READ');
                    setId(_id);
                }}
            ></Nav>
            {content}
            <ul>
                <li>
                    <a
                        herf="/create"
                        onClick={(event) => {
                            event.preventDefault();
                            setMode('CREATE');
                        }}
                    >
                        Create
                    </a>
                </li>
                {contextControl}
            </ul>
        </div>
    );
};

export default App;
