import React, {useState} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import Amplify, { API, Auth} from "aws-amplify";
import awsExports from "./aws-exports";
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react';

Amplify.configure(awsExports);

function App() {

  const [books, setBooks] = useState()
  const [items, setItems] = useState()

  const handleBooksClick = async function () {
    // const user = await Auth.currentAuthenticatedUser();
    // const token = user.signInUserSession.idToken.jwtToken;
    const res = await API.get('api19ff9801', '/books', {});
    setBooks(res);
    console.log(res);
  };

  const handleItemsClick = async function () {
    // const user = await Auth.currentAuthenticatedUser();
    // const token = user.signInUserSession.idToken.jwtToken;
    const res = await API.get('api19ff9801', '/items', {});
    setItems(res);
    console.log(res);
  };

  const listUsers = async function () {
    let apiName = 'AdminQueries';
    let path = '/listUsers';
    let myInit = { 
        queryStringParameters: {
          // "groupname": "Editors",
          "limit": 0,
          // "token": nextToken:string
        },
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
    }
    const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
    console.info(NextToken);
    console.info(rest);
    // nextToken = NextToken;
    // return rest;
  }

  const disableUser = async function () {
    let apiName = 'AdminQueries';
    let path = '/disableUser';
    let myInit = { 
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        },
        body: {
          username: "61951d36-44af-459a-bab0-2de77bf6a583",
        },        
    }
    const { NextToken, ...rest } =  await API.post(apiName, path, myInit);
    console.info(NextToken);
    console.info(rest);
    // nextToken = NextToken;
    // return rest;
  }

  const enableUser = async function () {
    let apiName = 'AdminQueries';
    let path = '/enableUser';
    let myInit = { 
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        },
        body: {
          username: "61951d36-44af-459a-bab0-2de77bf6a583",
        },        
    }
    const { NextToken, ...rest } =  await API.post(apiName, path, myInit);
    console.info(NextToken);
    console.info(rest);
    // nextToken = NextToken;
    // return rest;
  }


  return (
    <>
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Custom Email Label",
            placeholder: "Custom email placeholder",
            inputProps: { required: true, autocomplete: "email" },
          },
          {
            type: "name",
            label: "Custom Name Label",
            placeholder: "Custom Name placeholder",
            inputProps: { required: true, autocomplete: "username" },
          },
          {
            type: "password",
            label: "Custom Password Label",
            placeholder: "Custom password placeholder",
            inputProps: { required: true, autocomplete: "new-password" },
          },
        ]}
      />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
    </AmplifyAuthenticator>

    <div className="App">
      <header className="App-header">
        <button onClick={handleBooksClick}>Click Books api</button>
        <div>{books}</div>
        <button onClick={handleItemsClick}>Click Items api</button>
        <div>{items}</div>
        <button onClick={listUsers}>Click listUsers api</button>
        <button onClick={disableUser}>Click disableUser api</button>
        <button onClick={enableUser}>Click enableUser api</button>
        {/* <div>{items}</div> */}
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
    </>
  );
}

export default App

