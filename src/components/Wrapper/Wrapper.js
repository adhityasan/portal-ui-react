import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import WrapperStyles from '../../styles/Wrapper'

const Wrapper = (props) => {
  const { classes, children, padding } = props

  return (
    <div className={padding ? classes.root : null}>
      { children }
    </div>
  )
}

Wrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  padding: PropTypes.bool
}

Wrapper.defaultProps = {
  padding: true
}

export default withStyles(WrapperStyles)(Wrapper)