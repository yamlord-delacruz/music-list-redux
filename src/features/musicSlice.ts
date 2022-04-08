import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { IState, IMusic } from '../interfaces/MusicInterface'

// Fetch Music List
export const getMusicList = createAsyncThunk(
    'musicList/getMusicList',
    async () => {
        const response = await fetch('http://localhost:5000/musicList')
        const formattedResponse = await response.json()
        return formattedResponse
    }
)

// Delete Music
export const deleteMusic = createAsyncThunk(
    'music/deleteMusic',
    async (id: string) => {
        await fetch(`http://localhost:5000/musicList/${id}`, {
            method: 'DELETE',
        })
        return id
    }
)

// Toggle Music
export const toggleMusic = createAsyncThunk(
    'music/toggleMusic',
    async (id: string) => {
        const res = await fetch(`http://localhost:5000/musicList/${id}`)
        const musicToToggle = await res.json()
        const updMusic = { ...musicToToggle, favorite: !musicToToggle.favorite }

        await fetch(`http://localhost:5000/musicList/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updMusic)
        })
        return id
    }
)

// Add Music
export const addMusic = createAsyncThunk(
    'music/addMusic',
    async (music: IMusic) => {
        const response = await fetch('http://localhost:5000/musicList', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(music),
        })
        const formattedResponse = await response.json()
        return formattedResponse
    }
)

const initialState: IState = {
    musicList: [],
    isLoading: false
}

export const musicSlice = createSlice({
    name: 'musicList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMusicList.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getMusicList.fulfilled, (state, action) => {
            state.musicList = action.payload
            state.isLoading = false
        })
        builder.addCase(getMusicList.rejected, (state) => {
            state.isLoading = false
        })
        builder.addCase(deleteMusic.fulfilled, (state, action) => {
            state.musicList = state.musicList.filter((music) => music.id !== action.payload)
        })
        builder.addCase(toggleMusic.fulfilled, (state, action) => {
            state.musicList = state.musicList.map(
                (music) => music.id === action.payload
                    ? { ...music, favorite: !music.favorite }
                    : music
            )
        })
        builder.addCase(addMusic.fulfilled, (state, action) => {
            state.musicList.push(action.payload)
        })
    },
})

export const { } = musicSlice.actions

export default musicSlice.reducer