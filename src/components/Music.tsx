import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteMusic, toggleMusic } from '../features/musicSlice'
import { IPropsMusic } from '../interfaces/MusicInterface'

const Music: React.FC<IPropsMusic> = ({ music }) => {
    const dispatch = useDispatch()

    const renderMusic = (): JSX.Element => {
        return (
            <div className={`container__music ${music.favorite ? 'favorite' : ''}`} onDoubleClick={() => dispatch(toggleMusic(music.id))} >
                <div className='container__music-header'>
                    <h3>
                        <span className='container__image'><img className='container__resize' src={music.art} /></span>
                        {music.title}
                    </h3>
                    <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => dispatch(deleteMusic(music.id))} />
                </div>
                <p>{`${music.album} by ${music.artist}`}</p>
                <p><Link style={{ color: '#fff', cursor: 'pointer', textDecoration: 'none' }} to={`/music/${music.id}`}>View Details</Link></p>
            </div>
        )
    }
    return (<>{renderMusic()}</>)
}

export default Music