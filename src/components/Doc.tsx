import React, { useEffect, useState } from 'react';

import { Card, Layout } from 'antd';
import { contentStyles } from './Dashboard.styles';
import ReactMarkdown from 'react-markdown';

import './Doc.css';

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
            <ReactMarkdown source={content} />
          </Card>
        </Layout>
      </Layout>
    </Layout.Content>
  );
};
