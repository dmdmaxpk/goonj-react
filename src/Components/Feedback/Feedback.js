import React, { Component } from 'react';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import './Feedback.scss';
import { Modal, Fade, Button, Snackbar } from '@material-ui/core';
import AxiosInstance from '../../Utils/AxiosInstance';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            question: '',
            modal: false,
            selected: 5,
            comments: '',
            vertical: 'bottom',
            horizontal: 'center',
            snackbar: false,
            message: 'Thank you, have a great day!'
        }
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSnackbar = this.handleSnackbar.bind(this);
    }
    componentWillMount(){
        let currentDate = new Date;
        // console.log("currentDate", currentDate)
        let todaysDate = currentDate.setTime(currentDate.getTime());
        // console.log("todays date", todaysDate)
        let feedbackDate = localStorage.getItem('feedback_dtm');
        feedbackDate = new Date(feedbackDate);
        // console.log("feed", feedbackDate)
        let nextFeedbackDate = feedbackDate.setTime(feedbackDate.getTime() + 15 * 86400000);
        
        // console.log("next date", nextFeedbackDate, "last date", todaysDate)

        if(todaysDate >= nextFeedbackDate){
            localStorage.setItem('feedback', false);
        }
        let user = localStorage.getItem('userID');
        if(( localStorage.getItem('livePermission') || localStorage.getItem('CPPermission')) && (localStorage.getItem(user) > 4) && (localStorage.getItem('feedback') === "false") ){
            this.setState({
                modal: true
            })
        }
        AxiosInstance.get('/questions')
        .then(res =>{
            let questionData = res.data[0];
            this.setState({
                questionData,
                question: questionData.question
            })
        })
    }
    handleChange(e){
        if( e.target.name == "comments" && e.target.value.length <= 160 ){
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    selectReaction(reaction){
        this.setState({
            selected: reaction
        })
    }
    closeModal(){
        this.setState({
            modal: false
        })
    }
    handleSubmit(){
        const {comments, selected, questionData} = this.state;
        let answer = {
            question_id: questionData._id,
            response: selected,
            user_comments: comments,
            paywall_user_id: localStorage.getItem('userID'),
            msisdn: localStorage.getItem('liveMsisdn') ? localStorage.getItem('liveMsisdn') : localStorage.getItem('CPMsisdn'),
            source: localStorage.getItem('source')
        }
        AxiosInstance.post('/answer', answer)
        .then(res =>{
            if(res.data.code === 0){
                this.setState({snackbar: true});
                localStorage.setItem('feedback_dtm', new Date());
                localStorage.setItem('feedback', true);
                this.closeModal();
            }
        })
        .catch(err =>{
            alert("Something went wrong!");
        })
    }
    handleSnackbar(){
        this.setState({
            snackbar: !this.state.snackbar
        })
    }
    render(){
        const {snackbar, vertical, horizontal} = this.state;
        return(
            <div>
                <Modal
                    open={this.state.modal}
                    onClose={this.closeModal}
                    disableBackdropClick={true}
                    closeAfterTransition
                    className="feedbackModal"
                >
                    <Fade in={this.state.modal}>
                        <div className="feedbackContainer">
                            <GridContainer>
                                {/* <GridItem xs={12} sm={12} md={12} className="feedbackGI"> */}
                                    <div className="reactionDiv">
                                        <p className="questionText">{this.state.question}</p>
                                        <img src={require('../../Assets/feedback/1.png')} alt="" className={this.state.selected !== 1 ? "reactions" : "reactions selectedReaction"} onClick={()=> this.selectReaction(1)} alt="worst" />
                                        <img src={require('../../Assets/feedback/2.png')} alt="" className={this.state.selected !== 2 ? "reactions" : "reactions selectedReaction"} onClick={()=> this.selectReaction(2)} alt="worse" />
                                        <img src={require('../../Assets/feedback/3.png')} alt="" className={this.state.selected !== 3 ? "reactions" : "reactions selectedReaction"} onClick={()=> this.selectReaction(3)} alt="average" />
                                        <img src={require('../../Assets/feedback/4.png')} alt="" className={this.state.selected !== 4 ? "reactions" : "reactions selectedReaction"} onClick={()=> this.selectReaction(4)} alt="better" />
                                        <img src={require('../../Assets/feedback/5.png')} alt="" className={this.state.selected !== 5 ? "reactions" : "reactions selectedReaction"} onClick={()=> this.selectReaction(5)} alt="best" />
                                        <p className="questionText questionText2">
                                            What is the reason for your rating?
                                        </p>
                                        <input className="commentsInput" type="text" placeholder="Leave your comments here (optional)" name="comments" value={this.state.comments} onChange={this.handleChange} />
                                        <div className="feedbackBtnsDiv">
                                            <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
                                            {this.state.selected !== '' ?
                                                <button className="btnSubmitfb" onClick={this.handleSubmit}>Submit</button>
                                            :
                                                <Button color="primary" disabled>Submit</Button>
                                            }
                                        </div>
                                    </div>
                                {/* </GridItem> */}
                            </GridContainer>
                        </div>
                    </Fade>
                </Modal>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={snackbar}
                    onClose={this.handleSnackbar}
                    message={this.state.message}
                    key={vertical + horizontal}
                    autoHideDuration={3000}
                />
            </div>
        );
    }
}
 
export default Feedback;