
import guessPageCss from './css/GuessPage.module.css'
import loadingPageCss from '../../shared/components/loading/loadingComponent.module.css'
import { LoadingComponent } from '../../shared/components/loading/loadingComponent';
import { GuessingWordView } from './components/guessing_word_page/GuessingWordView';
import { GuessPageViewModel, PAGE } from './GuessPageViewModel';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GuessPage() {
    const vm = GuessPageViewModel();
    const navigate = useNavigate();
    useEffect(()=>{
        if (vm.page === PAGE.TO_SCORE){
            navigate("/home");
        }
    });
    return (
    <div className={guessPageCss.bg}>
        <div className={(vm.page === PAGE.LOADING ? loadingPageCss.loading_box : guessPageCss.hide)}>
            <LoadingComponent></LoadingComponent>
        </div>
        <div className={(vm.page === PAGE.GUESS_PAGE ? guessPageCss.question_box : guessPageCss.hide)}>
            <GuessingWordView vm={vm} ></GuessingWordView>
        </div>
    </div>
    )
}

export default GuessPage
