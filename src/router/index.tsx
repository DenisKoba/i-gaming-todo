import {createBrowserRouter} from 'react-router-dom';
import { Gallery } from '../pages/Gallery/Gallery';
import { Controls } from '../pages/Controls/Controls';
import React from 'react';

export const router = createBrowserRouter([
    {
        path: '/gallery',
        element: <Gallery />,
    },
    {
        path: '/controls',
        element: <Controls />,
    },
]);