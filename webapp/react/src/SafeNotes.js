/*
 * Copyright (c) 2020. Denis Rendler <connect@rendler.me>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/css/app.scss';

import Footer from './components/Page/Footer/Footer';
import Header from './components/Page/Header/Header';
import Layout from './components/Page/Layout/Layout';
import Logo from './components/Page/Logo/Logo';

import { ConfigContext } from './SafeNotes/context/Config';
import Home from './SafeNotes/pages/Home/Home';
import NoteView from './SafeNotes/pages/NoteView/NoteView';

const SafeNotes = () => {
  const { theme } = useContext(ConfigContext);

  return (
    <Router basename={process.env.REACT_APP_SAFENOTE_BASE_PATH}>
      <Layout classes={['safe-notes', 'container', 'mx-auto', 'px-2']}>

        <Header classes={['flex']}>
          <Logo wrapClasses={['flex', 'flex-col', 'mx-auto', 'sm:w-full', 'md:w-10/12', 'lg:w-8/12']}
                slClasses={['text-sm', 'text-gray-500', 'italic', 'pl-10', '-mt-3', 'mb-1']}
                {...theme.logo}
          >
            <a href="/" className="flex">
              <h1 className="text-3xl text-left pt-2 font-extrabold text-blue-500">safe</h1>
              <h1 className="text-3xl text-left pt-2 font-extrabold text-gray-500">notes</h1>
            </a>
          </Logo>
        </Header>

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/view-note/:noteId" component={NoteView}/>
        </Switch>

        <Footer/>
      </Layout>
    </Router>
  );
};

export default SafeNotes;
