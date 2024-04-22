import React, { useState, useEffect } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';

import { CatImage, fetchCatsPhotos } from '../../core/api/fetchCatsPhotos';

const { ipcRenderer } = window?.require('electron');

type LocalGalleryState = {
    photos: CatImage[],
    currentIndex: number,
    updateCurrentIndex: (value: number) => number,
    updatePhotos: (value: CatImage[]) => void,
};

export const Gallery = observer(() => {
    const localStore: LocalGalleryState = useLocalObservable<LocalGalleryState>(() => ({
        photos: [],
        currentIndex: 0,

        updateCurrentIndex(value: number) {
            return localStore.currentIndex = value;
        },

        updatePhotos(value: CatImage[]) {
            localStore.photos = value;
        },
    }));

    const [loading, setLoading] = useState(true);

    const getCatsPhotos = (): Promise<CatImage[]> | undefined => {
        setLoading(true);

        try {
            return fetchCatsPhotos();
        } catch (error) {
            console.error("Error fetching cat photos:", error);
        } finally {
            setLoading(false);
        }
    }

    const updateCatsPhotos = (response: CatImage[]): void => {
        localStore.updatePhotos(response);
        setLoading(false);
    }

    const loadCatsPhotosInitially = async (): Promise<void> => {
        const response = await getCatsPhotos();

        if (response) {
            updateCatsPhotos(response);
        }
    }

    const goNextSlide = (): void => {
        const index = () => {
            if (localStore.currentIndex === localStore.photos.length - 1) {
                return 0
            }

            return localStore.currentIndex + 1
        }
        localStore.updateCurrentIndex(index());
    };

    useEffect(() => {
        loadCatsPhotosInitially();
    }, [])

    useEffect(() => {
        ipcRenderer.on('nextSlide', goNextSlide);

        return () => {
            ipcRenderer.removeListener('nextSlide', goNextSlide);
        };
    }, []);

    if (localStore.photos.length > 0) {
        const currentPhoto = localStore.photos[localStore.currentIndex];

        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <img src={currentPhoto.url} alt="cat" />
            </div>
        );
    } else {
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Loading...</div>;
    }
});
