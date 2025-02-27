import React,{ useState } from 'react';
import classes from './popup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBatchesQuery, useUpdateBatchesMutation } from '../redux/api/api';
import { setIsPopUp } from '../redux/reducers/misc';
import { useAsyncMutation } from '../hooks/hooks';
import toast from 'react-hot-toast';

const BatchAddPopup=({ show }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const [batches, setBatches] = useState(user.batch);
    const batchInfo = useGetBatchesQuery();
    const allBatches = batchInfo?.data?.allBatches;
    const [changeBatches, isLoadingChangeBatch] = useAsyncMutation(useUpdateBatchesMutation);

    const toggleBatch = (batchName) => {
        if(batches.includes(batchName)) {
            setBatches(batches.filter(b => b !== batchName));
        } 
        else {
            setBatches([ ...batches, batchName ]);
        }
    }

    const handleClose = () => {
        if(batches !== user.batch) changeBatches("Updating Batches...", { userId: user._id, batches });
        else toast.error("Batches are same as before");

        dispatch(setIsPopUp(false));
    }

    return(
        <div className = {show ? classes.displayBlock : classes.displayNone}>
            {!isLoadingChangeBatch && !batchInfo?.isLoading && <div className={classes.popupMain} onClick = {(e) => e.stopPropagation()}>
                <div className={classes.heading}><h1>UPDATE YOUR BATCHES</h1></div>
                <div className={classes.batchTags}>
                    {allBatches?.map((batch,index) => (
                        <button key={index} 
                            className={`${classes.batchTag} ${batches.includes(batch) ? classes.inTeacherBatches : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleBatch(batch)
                            }}
                        >{batch} {batches.includes(batch) ? '❌' : '➕'}
                        </button>
                    ))}
                </div>                
                <button type = 'submit' onClick = {handleClose} className = {classes.btn}> Update </button>
            </div>}
        </div>
    );
}

export default BatchAddPopup;