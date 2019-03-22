import { connect } from 'react-redux';
import { closeDrawer } from 'state/drawer/actions';
import { isOpen } from 'state/drawer/selectors';
import Drawer from 'ui/menu/Drawer';

export const mapStateToProps = state => ({
  isOpen: isOpen(state),
});

export const mapDispatchToProps = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);
