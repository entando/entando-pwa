import { connect } from 'react-redux';
import { closeSearch } from 'state/search/actions';
import SearchBar from 'ui/menu/SearchBar';

export const mapDispatchToProps = dispatch => ({
  closeSearch: () => dispatch(closeSearch()),
});

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
