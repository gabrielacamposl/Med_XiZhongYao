// import '@/styles/globals.css'
import { LayoutProvider } from '../layout/context/layoutcontext';
// import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import dynamic from 'next/dynamic';
import '../pages/'


// export default function App({ Component, pageProps }) {
//   // return <Component {...pageProps} />
//   if (Component.getLayout) {
//     return <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider>;
//   } else {
//     return (
//       <LayoutProvider>
//         {/* <Layout> */}
//         <Component {...pageProps} />
//         {/* </Layout> */}
//       </LayoutProvider>
//     );
//   }
// }

const App = ({ Component, pageProps }) => {

  // return <Component {...pageProps} />
  if (Component.getLayout) {
    return <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)} </LayoutProvider>;
  } else {
    return (
      <LayoutProvider>

      
        <Component {...pageProps} />
        {/* </Layout> */}

      </LayoutProvider>
    );
  }

}

export default dynamic(() => Promise.resolve(App), { ssr: false })

