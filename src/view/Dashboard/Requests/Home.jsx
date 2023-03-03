import React, {useState} from 'react'
import styled from 'styled-components'
import Search from '../../../reusables/table-search/Search'
import { PageContainer } from '../Overview/Home'
import Approved from './approved/Approved'
import Declined from './declined/Declined'
import Pending from './pending/Pending'
import Skeleton from 'react-loading-skeleton'



const Home = () => {
const [isApproved, setIsApproved] = useState(true)
const [isPending, setIsPending] = useState(false)
const [isDeclined, setIsDeclined] = useState(false)

const showApproveHandler = () => {
  setIsDeclined(false)
  setIsApproved(true)
  setIsPending(false)
}
const showPendingHandler = () => {
  setIsApproved(false)
  setIsDeclined(false)
  setIsPending(true)
}
const showDeclinedHandler = () => {
  setIsApproved(false)
  setIsPending(false)
  setIsDeclined(true)
}
  return (
    <PageContainer>
        <Container>
            <div className='table-container'>
                <div className='table-head' style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <h3>Account Request</h3>
                    {/* <Search/> */}
                </div>
                <RouteWrapper>
                    <button onClick={showApproveHandler} className={isApproved ? 'active' :'' }>Approved</button>
                    <button onClick={showPendingHandler} className={isPending ? 'active' :'' }>Pending</button>
                    <button onClick={showDeclinedHandler} className={isDeclined ? 'active' :'' }>Declined</button>
                </RouteWrapper>
            </div> 

            <>
                {isApproved && <Approved/>}
                {isPending && <Pending/>}
                {isDeclined && <Declined/>}
            </> 
        </Container>
    </PageContainer>
  )
}

export default Home

const Container = styled.div`
  background: #fff;
  padding: 0.5rem 0rem 1.8rem 2rem;
  position: relative;

   .table-container{
    border-bottom: 0.7px solid #E0E0E0;
    .table-head{
      padding: 1rem 2rem;
      
      h3{
        margin: 0 !important;
        font-size: 20px;
      }
    }
    
  }
`
const RouteWrapper = styled.div`
  margin-top: 10px;

  button{
    background: transparent;
    border: none;
    padding: 5px 40px;
    cursor: pointer;
    font-size: 13px;
    transition: 0.3s ease-in;

    &:hover{
      color: #0E814A;
    }
  }
    .active{
        color: #0E814A;
        border-bottom: 1px solid #0E814A;
    }
`