import { AppProps } from 'next/app';

import 'antd/dist/antd.css';
import './index.css';

const app = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default app;
