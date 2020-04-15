import React, { useEffect, useState } from 'react';

import { Card, Layout } from 'antd';
import ReactMarkdown from 'react-markdown';
import { contentStyles } from './Dashboard.styles';

import './Doc.module.scss';

export const Doc = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    (async () => {
      const resp = await fetch('/api.MD');
      const str = await resp.text();
      setContent(str);
    })();
  }, []);

  return (
    <Layout.Content style={contentStyles}>
      <Layout className="content">
        <Layout>
          <Card>
            <div className="doc">
              <ReactMarkdown source={content} />
            </div>
          </Card>
        </Layout>
      </Layout>
    </Layout.Content>
  );
};
