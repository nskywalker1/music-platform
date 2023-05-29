import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Box, Button, Card, Grid} from "@mui/material";
import {useRouter} from "next/router";
import {ITrack} from "../../types/track";
import TrackList from "../../components/TrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/action-creators/track";
import {RootState} from "../../store/reducers";

const Index = () => {

    const router = useRouter()
    const {tracks, error} = useTypedSelector(state => state.track)

    if(error){
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        <MainLayout>
            <Grid container justifyContent="center" >
                <Card style={{width: 900}} >
                    <Box p={2} >
                    <Grid container justifyContent={"space-between"} >
                        <h1>Tracklist</h1>
                        <Button onClick={() => router.push('/tracks/create')} >Upload</Button>
                    </Grid>
                    </Box>
                    <TrackList tracks={tracks} />
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks())

    return {
        props: {}
    }
})
