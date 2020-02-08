import * as React from "react"; import { Component } from "react";
import { Card } from "../card/card";

const panelStyle = {
    display: "inline-block",
    height: "1em",
    overflow: "visible"
};
const controlStyle = {
    display: "inline-block",
    float: "right",
};

export interface PanelProps {
    title?: string;
    customStyle?: CSSStyleDeclaration;
    controlStyle?: CSSStyleDeclaration;
}

export interface PanelState {
    open: boolean;
}

export class Panel extends Component<PanelProps, PanelState> {
    constructor(props: PanelProps){
        super(props);

        this.state = {
            open: false
        };
    }
    
    onToggle() {
        this.setState({
            open: !this.state.open
        })
    }

    computeStyle() {
        const style = {...panelStyle, width: "1em", height: "1em", overflow: "hidden", ...(this.props.customStyle ? this.props.customStyle : {})};

        if (this.state.open) {
            style.height = "auto";
            style.overflow = "visible";
        } 

        return style;
    }

    render() {
        return (
            <aside style={this.computeStyle() as any}>
                <Card 
                    showTitle={true} 
                    title={this.props.title || "Panel"} 
                    clickHandler={()=> this.onToggle()} 
                />
                <div style={{ ...controlStyle, ...(this.props.controlStyle ? this.props.controlStyle : {})} as any}
                    onPointerDown={(e)=> this.onToggle()}
                >
                    X
                </div>
                { this.props.children }
            </aside>
        )
    }
}

