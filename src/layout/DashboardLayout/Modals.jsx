import React, {Fragment, useState, useEffect} from 'react'
import styled from 'styled-components';
import citLogo from '../../assets/images/logo.png'
import modalApproved from '../../assets/images/modal-approved-icon.svg' 
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../../store/ui-slice';
import { BASE_URL } from '../../config/config';

const Modals = () => {
    const token = JSON.parse(sessionStorage.getItem('token'))
    const customerId = JSON.parse(sessionStorage.getItem('pendingcustomerId'))
    const declinedCustomerId = JSON.parse(sessionStorage.getItem('declinedCustomerId'))
    const [declineReason, setDeclineReason] = useState('')
    const [enableSumit, setEnableSubmit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [rejectionloading, setRejectionLoaading] = useState(false)
    const [rejectionReason, setRejectionReason] = useState('')
    const {isApproveModal, approveSuccesModal, isDeclineModal, declineReasonModal, declineSuccessModal, showRjectionReasonModal } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    const handleReasonText = (e) => {
        setDeclineReason(e.target.value)

        if(declineReason.length > 2){
            setEnableSubmit(true)
        } else{
            setEnableSubmit(false)
        }
    }

    const confirmApproveHandler = () => {
      dispatch(modalActions.toggleIsApproveModal())
      dispatch(modalActions.toggleApproveSuccessModal())
      approveRequest()
      setTimeout(() => {
        dispatch(modalActions.toggleApproveSuccessModal())
      }, 2000)
    }

    const confirmDeclineHandler = () => {
      dispatch(modalActions.toggleIsDeclineModal())
      dispatch(modalActions.toggleDeclineReasonModal())
    }

    const submitDeclineHandler = () => {
      dispatch(modalActions.toggleDeclineReasonModal())
      dispatch(modalActions.toggleDeclineSuccessModal())
      disapproveRequest()
      setTimeout(() => {
        dispatch(modalActions.toggleDeclineSuccessModal())
      }, 2000)      
    }

    const approveRequest = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/api/1/account-request/${customerId}/`, {
         method: "PUT",
        body: JSON.stringify(
          {
            status: 'approved'
          }
        ),
        headers: {
          "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },  
      })
      const data = await response.json()
      } catch (error) {
        console.log(error)
      }
    }

    const disapproveRequest = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/api/1/account-request/${customerId}/`, {
         method: "PUT",
        body: JSON.stringify(
          {
            status: 'declined',
            rejection_reason: declineReason,
          }
        ),
        headers: {
          "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },  
      })
      const data = await response.json()
      console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      const getRejectionReason = async () => {
      try {
        setRejectionLoaading(true)
        const response = await fetch(`${BASE_URL}/api/1/account-request/${declinedCustomerId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },  
      })
      const data = await response.json()
      setRejectionLoaading(false)
      setRejectionReason(data?.rejection_reason)
      } catch (error) {
        console.log(error)
      }
    }
    getRejectionReason()
    }, [rejectionloading, customerId, showRjectionReasonModal])

  return (
    <Fragment>
           {isApproveModal && <ModalContainer>
            <ModalContent>
              <img src={citLogo} alt="" />
              <h4>Are you sure you want to Approve?</h4>
              <p>Do you want to approve account creation?</p>
              <div className="modal-buttons">
                <button className='modal-cancelBtn' onClick={() => {dispatch(modalActions.toggleIsApproveModal())}}>Cancel</button>
                <button className="modal-confirmBtn" onClick={confirmApproveHandler}>Confirm</button>
              </div>
            </ModalContent>
            </ModalContainer>}        
            {approveSuccesModal && <ModalContainer>
            <ApprovedModal>
              <img src={modalApproved} alt="" />
              <h4>Successfully Approved</h4>
              <p>Account creation has been approved</p>              
            </ApprovedModal>
            </ModalContainer>}        
            {isDeclineModal && <ModalContainer>
            <ModalContent>
              <img src={citLogo} alt="" />
              <h4>Are you sure you want to Decline?</h4>
              <p>Do you want to disapprove account creation?</p>
              <div className="modal-buttons">
                <button className='modal-cancelBtn' onClick={() => {dispatch(modalActions.toggleIsDeclineModal())}}>Cancel</button>
                <button className="modal-confirmBtn" onClick={confirmDeclineHandler}>Confirm</button>
              </div>
            </ModalContent>
            </ModalContainer>}        
            {declineReasonModal &&
            <ModalContainer>
            <ModalContent>
              <div className='frontLogo'>
                <img src={citLogo} alt="" />
              </div>
              <textarea onChange={handleReasonText} name="" id="comment-box" cols="30" rows="10" style={{resize: 'none', padding: '10px', width: '350px',height: '140px'}}
                placeholder="Enter Comment">
              </textarea>
              <div className="confirm-decline">
              <button className='modal-cancelBtn' onClick={() => {dispatch(modalActions.toggleDeclineReasonModal())}}>Cancel</button>
              <button className="modal-confirmBtn" disabled={enableSumit ? false : true} onClick={submitDeclineHandler}>Submit</button>
              </div>
            </ModalContent>
            </ModalContainer>
             }     
           { showRjectionReasonModal && <ModalContainer>
            <ModalContent>
              <div className='frontLogo'>
                <img src={citLogo} alt="" />
              </div>
              <textarea value={rejectionReason} name="" id="comment-box" cols="30" rows="10" style={{resize: 'none', padding: '10px', width: '350px',height: '140px'}} disabled> 
              </textarea>
              <div className="confirm-decline">
              <button className='modal-cancelBtn' onClick={() => {dispatch(modalActions.toggleShowRejectionReasonModal())}}>Cancel</button>
              </div>
            </ModalContent>
            </ModalContainer> } 
            {declineSuccessModal && <ModalContainer>
            <ApprovedModal>
              <img src={modalApproved} alt="" />
              <h4>Successfully Declined</h4>
              <p>Account creation has been declined.</p>              
            </ApprovedModal>
          </ModalContainer>}        
    </Fragment>
  )
}

export default Modals

const ModalContainer = styled.div`
  background-color: #3838383c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 192000;
  width: 100vw;
  height: 100vh;
`
const ModalContent = styled.div`
  border-radius: 8px;
  background-color: #ffffff;
  padding: 20px;

  .confirm-decline{
    display: flex;
    justify-content: center;
    gap: 20px; 

    button{
      background-color: #0e814a;
      border: none;
      outline: none;
      cursor: pointer;
      color: #fff;
      font-size: 11px;
      padding: 8px 40px;
      border-radius: 6px;

      &:disabled{
        background:#535655;
        color: grey;
      }
    }
  }

  .frontLogo{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  img{
    width: 50px;
  }
   p{
    font-size: 11px;
    margin-bottom: 20px;
   }
   h4{
    font-size: 14px;
    margin-bottom: 5px;    
   }
   .modal-buttons{
    margin-top: 10px;
   
    .modal-cancelBtn {
      color: #000;
      border: 1px solid #d0d5dd;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 11px;
      padding: 8px 40px;
      border-radius: 6px;
      margin-right: 10px;
    }
  
    .modal-confirmBtn {
      background-color: #0e814a;
      border: none;
      outline: none;
      cursor: pointer;
      color: #fff;
      font-size: 11px;
      padding: 8px 40px;
      border-radius: 6px;
    }
   }
`
const ApprovedModal = styled.div`
  border-radius: 8px;
  background-color: #ffffff;
  padding: 20px;
 
     p{
    font-size: 11px;
    margin-bottom: 20px;
   }
   h4{
    font-size: 14px;
    margin-bottom: 5px;    
   }

`