import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ProjectCode } from '../BasicExampleProjects';
import { Icon } from '../Icons/Icon';
import { Sidebar } from './Sidebar';
import UserContent from './UserContent';

interface DocChangeInfo {
  type: 'update' | 'initialize' | 'presence';
  content: string;
}

interface Props {
  yorkieClientAddress: string;
  yorkieDocumentKey: string;
  yorkieApiKey: string;
  projectCode: ProjectCode;
  documentStructure: string;
  iframeUrl: string;
}

export const UserNames = {
  user1: 'User 1',
  user2: 'User 2',
  user3: 'User 3',
  user4: 'User 4',
};
export const UserColors = {
  user1: 'green',
  user2: 'purple',
  user3: 'red',
  user4: 'yellow',
};

export function BasicExampleView({
  yorkieClientAddress,
  yorkieDocumentKey,
  projectCode,
  iframeUrl,
  documentStructure,
  yorkieApiKey,
}: Props) {
  const [docChangeInfos, setDocChangeInfos] = useState<DocChangeInfo[]>([]);
  const [userList, setUserList] = useState<('user1' | 'user2' | 'user3' | 'user4')[]>(['user1', 'user2']);
  const [projectCodeState, setProjectCodeState] = useState<ProjectCode>(projectCode);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let unsubscribeDoc: Function;
    let unsubscribePresence: Function;
    const activate = async () => {
      const yorkie = await import('yorkie-js-sdk');
      const client = new yorkie.Client(yorkieClientAddress, {
        apiKey: yorkieApiKey,
      });
      await client.activate();
      const doc = new yorkie.Document('vuejs-kanban');
      await client.attach(doc);
      setDocChangeInfos((prev) => [...prev, { type: 'initialize', content: 'Connection has been established!' }]);
      unsubscribeDoc = doc.subscribe((event) => {
        if (event.type === 'remote-change') {
          for (const changeInfo of event.value) {
            for (const path of changeInfo.paths) {
              setDocChangeInfos((prev) => [...prev, { type: 'update', content: path }]);
            }
          }
        }
      });
      unsubscribePresence = client.subscribe((event) => {
        if (event.type === 'peers-changed') {
          // const documentKey = doc.getKey();
          // const changedPeers = event.value[documentKey];
          // setDocChangeInfos((prev) => [...prev, { type: 'presence', content: 'presence change has occurred!' }]);
        }
      });
    };
    activate();
    return () => {
      if (unsubscribeDoc) unsubscribeDoc();
      if (unsubscribePresence) unsubscribePresence();
    };
  }, [yorkieClientAddress, yorkieDocumentKey, yorkieApiKey]);

  const scrollToBottom = useCallback(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messagesEndRef]);

  useEffect(scrollToBottom, [docChangeInfos, scrollToBottom]);

  const deleteUser = useCallback(
    (userId: string) => {
      if (userList.length === 1) {
        alert('You need at least one user');
        return;
      }
      setUserList((prev) => prev.filter((user) => user !== userId));
    },
    [setUserList, userList.length],
  );

  const addUser = useCallback(() => {
    if (userList.length === 4) {
      alert("You can't add more users");
      return;
    }
    if (userList[0] !== 'user1') {
      setUserList((prev) => ['user1', ...prev]);
      return;
    }
    if (userList[1] !== 'user2') {
      setUserList((prev) => prev.slice(0, 1).concat(['user2']).concat(prev.slice(1)));
      return;
    }
    if (userList[2] !== 'user3') {
      setUserList((prev) => prev.slice(0, 2).concat(['user3']).concat(prev.slice(2)));
      return;
    }
    if (userList[3] !== 'user4') {
      setUserList((prev) => prev.slice(0, 3).concat(['user4']).concat(prev.slice(3)));
      return;
    }
  }, [setUserList, userList]);

  return (
    <main className="container">
      <Sidebar
        defaultOpened={true}
        title="Kanban Board"
        description="Kanban Board is a tool for managing tasks and workflow. It is a visual way to manage tasks and workflow."
        projectCode={projectCode}
        documentStructure={documentStructure}
      />
      <div className="content code_view">
        <div className="pin_box">
          <ul className="pin_list">
            {userList.map((user) => {
              return (
                <li key={user} className={classNames('pin_item shadow_m')}>
                  <span className="user" style={{ margin: '0px' }}>
                    <span className={`icon gradient_180deg_${UserColors[user]}`}></span>
                    <span className="text">{UserNames[user]}</span>
                  </span>
                  <div className="btn_box">
                    <button
                      type="button"
                      className={classNames('btn btn_line btn_pin')}
                      title="Pin"
                      onClick={() => {
                        deleteUser(user);
                      }}
                    >
                      <Icon type="close" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <button type="button" className="btn btn_add" onClick={addUser}>
            <Icon type="plus" />
            <span className="blind">유저 추가하기</span>
          </button>
        </div>

        <ul className="grid_list2">
          {userList.map((user) => {
            return <UserContent key={user} user={user} iframeUrl={iframeUrl} />;
          })}
        </ul>

        <div className="log_box">
          <div className="log_inner">
            <div className="log_title">Event Log</div>
            <div style={{ overflowY: 'auto', paddingLeft: 3, maxHeight: 113 - 18 - 5, fontSize: 12 }}>
              {docChangeInfos.map((changeInfo, index) => (
                <div className="log_desc" key={index}>
                  <span style={{ fontWeight: 'bold' }}>event</span> -{' '}
                  {changeInfo.type === 'update' && <span style={{ opacity: 0.5 }}>modification occured at </span>}
                  <span>{changeInfo.content}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
