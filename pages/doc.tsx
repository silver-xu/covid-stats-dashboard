import { Doc } from '../components/Doc';
import { MainLayout } from '../components/MainLayout';
import { Layout } from 'antd';

import { contentStyles } from '../components/Dashboard.styles';

const DocPage = () => (
  <MainLayout selectedKey="doc">
    <Layout.Content style={{ ...contentStyles, marginTop: '30px' }}>
      <Doc />
    </Layout.Content>
  </MainLayout>
);
export default DocPage;
