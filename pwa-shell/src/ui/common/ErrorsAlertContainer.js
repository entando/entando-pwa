import { connect } from 'react-redux';
import { addErrors, getErrors, clearErrors } from '@entando/messages';
import { injectIntl } from 'react-intl';
import { clearMessageIds } from 'state/messageIds/actions';
import { getMessageIds } from 'state/messageIds/selectors';

import ErrorsAlert from 'ui/common/ErrorsAlert';

export const mapStateToProps = state => ({
  messages: getErrors(state),
  messageIds: getMessageIds(state),
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onDismiss: () => {
    dispatch(clearErrors());
    dispatch(clearMessageIds());
  },
  onMessageIdsAdded: msgIds => dispatch(
    addErrors(msgIds.map(msg => intl.formatMessage(msg.id, msg.values || {}))),
  ),
});

const ErrorsAlertContainer = connect(mapStateToProps, mapDispatchToProps)(ErrorsAlert);

export default injectIntl(ErrorsAlertContainer);
