import React from 'react';
import {ITrack} from "../types/track";
import {Card, Grid, IconButton} from "@mui/material";
import styles from '../styles/TrackItem.module.scss'
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useAction} from "../hooks/useAction";
import axios from "axios";

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {

    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useAction()

    const play = (e) => {
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
    }

    const deleteTrack = async (track) => {
        try {
            const response = await axios.delete('http://localhost:5000/tracks/' + track._id)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}  >
            <IconButton onClick={play} >
                {!active
                ? <PlayArrow />
                : <Pause /> }
            </IconButton >
            <img width={70} height={70} src={'http://localhost:5000/' + track.picture} />
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}} >
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}} >{track.artist}</div>
            </Grid>
            {active && <div>02:43 / 03:22</div>}
            <IconButton onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}} >
                <Delete onClick={() => deleteTrack(track)} />
            </IconButton>
        </Card>
    );
};

export default TrackItem;