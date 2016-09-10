
import React, { Component, PropTypes } from "react";
import StateBrokerService from "./service";
import { BehaviorSubject } from "rxjs";

export default (...props: String[]): Component =>
    (ComposedComponent: Component): Component =>
        class extends Component {
            static propTypes = {
                state: PropTypes.object,
            }

            state = props.reduce((prev: Object, prop: String): Object => true && { ...prev, [prop]: null }, {})

            _subscriptions = null
            componentWillMount() {
                this._subscriptions = props.map((prop: String): BehaviorSubject =>
                    ::StateBrokerService.subscribe(prop, ::this.setState)
                );
            }

            componentWillUnmount() {
                if (this._subscriptions) {
                    this._subscriptions.forEach((sub: BehaviorSubject) => {
                        sub.unsubscribe();
                    });
                }
            }

            render(): Component {
                return (<ComposedComponent
                    {...this.props}
                    state={Object.assign({}, this.props.state, this.state)}
                    actions={{
                        ...props.reduce((acc: Object, prop: string): Object =>
                            true && {
                                ...acc,
                                [`${prop}Change`]: (val: any): void => ::StateBrokerService.publish(prop, { [prop]: val }),
                            }
                        , {}),
                        publish: (channel: string, data: any): void => ::StateBrokerService.publish(channel, { [channel]: data }),
                    }}
                />);
            }
        };
