import { connect } from 'react-redux';
import Drawer from 'ui/menu/Drawer';
import { closeDrawer } from 'state/drawer/actions';
import { isOpen } from 'state/drawer/selectors';

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
