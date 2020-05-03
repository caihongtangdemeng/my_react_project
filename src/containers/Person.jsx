import Person from '../components/Person'
import {connect} from 'react-redux'
import {addPerson} from '../redux/actions/person'

export default connect(
    state=>({
      persons:state.persons,
      shu:state.number
    }),
  {addPerson}
)(Person)