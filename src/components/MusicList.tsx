import Music from './Music'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useEffect } from 'react'
import { getMusicList } from '../features/musicSlice'

const MusicList = () => {
    const dispatch = useDispatch()
    const musicList = useSelector((state: RootState) => state.music.musicList)

    useEffect(() => {
        dispatch(getMusicList())
    }, [])

    const createList =
        musicList.length > 0 ?
            <div className='container__music-list'>
                {musicList.map((music) => (
                    <Music key={music.id} music={music} />
                ))}
            </div> :
            'No Music to Show'

    return (<>{createList}</>)
}

export default MusicList