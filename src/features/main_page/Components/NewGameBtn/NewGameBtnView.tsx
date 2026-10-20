
import Button from 'react-bootstrap/Button';
import type { MainPageViewModel } from '../../MainPageViewModel';
import { useNavigate } from 'react-router-dom';
import { new_game_confirm } from '../../../new_game_page/NewGamePageView';

export function NewGameBtn(props : { vm : MainPageViewModel}) {
    const vm = props.vm;
    const navigate = useNavigate();
    return (<Button variant="primary" size='lg' onClick={async()=>{
        if(vm.progress_repo.is_have_save()){
            let res = await new_game_confirm({ 
                vm: vm 
            })
            if(res){
                vm.do_reset_progress_save();
                navigate('/guess');
            }
        } else {
            navigate('/guess');
        }
        
    }}>เริ่มใหม่</Button>);
}

