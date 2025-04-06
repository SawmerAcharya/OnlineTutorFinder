// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AppContexProvider } from './Context/AppContex.jsx';


const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(

  
  <React.StrictMode>
    <AppContexProvider>
    <QueryClientProvider client={queryClient}><App />
    </QueryClientProvider>
    </AppContexProvider>
    
  </React.StrictMode>,
);

