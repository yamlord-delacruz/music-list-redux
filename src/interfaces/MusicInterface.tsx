export interface IMusic {
    id: string
    artist: string
    album: string
    title: string
    art: string
    favorite: boolean
}

export interface IPropsMusic {
    music: IMusic
}

export interface IPropsHeader {
    title?: string
    onAdd: () => void
    showAdd: boolean
}

export interface IPropsButton {
    color?: string
    text: string
    onClick: () => void
}

export interface IState {
    musicList: IMusic[]
    isLoading: boolean
}

const MusicInterface = () => {
    return (<></>)
}

export default MusicInterface