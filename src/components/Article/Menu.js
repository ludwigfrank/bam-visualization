import * as React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Wrapper = styled('div')`
    position: absolute;
    opacity: 0;
    background-color: white;
    box-shadow: ${props => props.theme.shadow[4]};
    border-radius: 4px;
    line-height: 16px;
    padding: 4px 8px;
    transition: all 0.2s;
    *:not(:first-child) {
        margin-left: 4px;
    }
`

const Link = styled('div')`
    font-size: 13px;
    text-transform: capitalize;
    display: inline-block;
    color: ${props => props.isActive ? props.theme.color.text.primary : props.theme.color.text.secondary};
    /*font-weight: ${props => props.isActive ? 900 : 500}*/
`

export default class Menu extends React.Component {
    /**
     * Check if the current selection has a mark with `type` in it.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasMark(type) {
        const { value } = this.props
        return value.activeMarks.some(mark => mark.type === type)
    }

    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickMark(event, type) {
        const { value, onChange } = this.props
        event.preventDefault()
        const change = value.change().toggleMark(type)
        onChange(change)
    }

    /**
     * Render a mark-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderMarkButton(type, icon) {
        const isActive = this.hasMark(type)
        const onMouseDown = event => this.onClickMark(event, type)

        return (
            // eslint-disable-next-line react/jsx-no-bind
            <Link onMouseDown={onMouseDown} isActive={isActive}>
                <span className="material-icons">{type.split()[0]}</span>
            </Link>
        )
    }

    /**
     * Render.
     *
     * @return {Element}
     */

    render() {
        const root = window.document.getElementById('root')

        return ReactDOM.createPortal(
            <Wrapper
                innerRef={this.props.menuRef}
            >
                {this.renderMarkButton('bold', 'format_bold')}
                {this.renderMarkButton('italic', 'format_italic')}
{/*
                {this.renderMarkButton('underlined', 'format_underlined')}
*/}
                {this.renderMarkButton('document', 'format_document')}
            </Wrapper>,
            root
        )
    }
}