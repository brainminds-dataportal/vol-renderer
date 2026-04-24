import React from "react";
import { useAtom } from "jotai";


import {
    Alignment,
    Collapse,
    Icon,
    Slider,
    Switch,
    Tab,
    Tabs,
} from "@blueprintjs/core";


import * as StAtm from '../StateAtoms';

import SlicesControls from "./SlicesControls";

import "./PreviewControls.scss";


type PreviewControlsProps = {
    inline?: boolean,
};

const PreviewTabId = {
    Volume: 'volume',
    Slices3D: 'slices-3d',
} as const;

const PreviewControls = (props: PreviewControlsProps) => {

    const [volumeLoaded,] = useAtom(StAtm.volumeLoaded);

    const [viewMode, setViewMode] = useAtom(StAtm.viewMode);

    const [isothreshold, setIsothreshold] = useAtom(StAtm.isothreshold);
    const [clims, setClims] = useAtom(StAtm.clims);
    const [castIso, setCastIso] = useAtom(StAtm.castIso);

    const [volumeValMin,] = useAtom(StAtm.volumeValMin);
    const [volumeValMax,] = useAtom(StAtm.volumeValMax);

    const [controlsExpanded, setControlsExpanded] = React.useState<boolean>(!props.inline);


    const slicesControls =
        <SlicesControls
            extra={viewMode === StAtm.ViewMode.Slice3D}
        />
        ;

    const selectedTabId = viewMode === StAtm.ViewMode.Slice3D
        ? PreviewTabId.Slices3D
        : PreviewTabId.Volume;


    return (

        <div
            className={props.inline ? 'bp6-dark inlinePreviewControls' : undefined}
            style={{
                //backgroundColor: "#EEE",
                padding: props.inline ? 0 : 6,
                paddingLeft: 6,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: props.inline ? '#eceaea' : '#000'
            }}
        >
            <div>

                <div
                    style={{
                        paddingTop: props.inline ? 0 : 6,
                        minWidth: 350,
                    }}
                >
                    {props.inline ?
                        <div
                            style={{
                                position: 'absolute',
                                padding: 6, left: 330,
                                cursor: 'pointer',
                                zIndex: 10,
                            }}
                            onClick={() => setControlsExpanded(!controlsExpanded)}
                        >
                            <Icon
                                style={{ color: '#FFF' }}
                                icon={controlsExpanded ? "chevron-up" : "chevron-down"}
                            />
                        </div>
                        :
                        null
                    }

                    <Tabs
                        className={props.inline ? 'inlineControlsTabs' : undefined}
                        id="tabs"
                        renderActiveTabPanelOnly
                        selectedTabId={selectedTabId}
                        onChange={(vm) => {
                            const newViewMode = vm === PreviewTabId.Slices3D
                                ? StAtm.ViewMode.Slice3D
                                : StAtm.ViewMode.Volume3D;
                            setViewMode(newViewMode);
                        }}
                    >
                        <Tab
                            id={PreviewTabId.Volume}
                            className={props.inline ? 'inlineControls' : ''}
                            disabled={!volumeLoaded}
                            title={<span><Icon icon="cube" /> Volume</span>}
                            panel={
                                <div
                                    style={{
                                        overflowX: 'clip',
                                        overflowY: 'auto',
                                        padding: '0 10px 0 4px',
                                    }}
                                >
                                    <Collapse isOpen={controlsExpanded}>
                                        <div
                                            style={{
                                                marginTop: 16, borderTop: "solid 1px #d1d1d1", padding: 10,
                                            }}
                                        >
                                            <Switch
                                                checked={castIso}
                                                disabled={!volumeLoaded}
                                                label="Ray Casting method"
                                                alignIndicator={Alignment.RIGHT}
                                                innerLabel="Maximum Intensity Projection"
                                                innerLabelChecked="ISO Surface"
                                                onChange={() =>
                                                    setCastIso(!castIso)
                                                }
                                            />
                                            <span>Render threshold (ISO Surface)</span>
                                            <Slider
                                                min={volumeValMin}
                                                max={volumeValMax}
                                                disabled={!volumeLoaded || !castIso}
                                                stepSize={(volumeValMax - volumeValMin) / 255}
                                                labelPrecision={(volumeValMax - volumeValMin) > 100 ? 0 : 2}
                                                labelValues={[]}
                                                showTrackFill={false}
                                                value={isothreshold}
                                                onChange={setIsothreshold}
                                            />
                                            <span>Colormap boundary 1</span>
                                            <Slider
                                                min={volumeValMin}
                                                max={volumeValMax}
                                                disabled={!volumeLoaded}
                                                stepSize={(volumeValMax - volumeValMin) / 255}
                                                labelPrecision={(volumeValMax - volumeValMin) > 100 ? 0 : 2}
                                                labelValues={[]}
                                                showTrackFill={false}
                                                value={clims[0]}
                                                onChange={(value: number) =>
                                                    setClims([value, clims[1]])
                                                }
                                            />
                                            <span>Colormap boundary 2</span>
                                            <Slider
                                                min={volumeValMin}
                                                max={volumeValMax}
                                                disabled={!volumeLoaded}
                                                stepSize={(volumeValMax - volumeValMin) / 255}
                                                labelPrecision={(volumeValMax - volumeValMin) > 100 ? 0 : 2}
                                                labelValues={[]}
                                                showTrackFill={false}
                                                value={clims[1]}
                                                onChange={(value: number) =>
                                                    setClims([clims[0], value])
                                                }
                                            />

                                        </div>
                                    </Collapse>
                                </div>
                            } />
                        {/*<Tabs.Expander />*/}
                        <Tab
                            id={PreviewTabId.Slices3D}
                            className={props.inline ? 'inlineControls' : ''}
                            disabled={!volumeLoaded}
                            title={<span><Icon icon="layers" /> 3D Slices </span>}

                            panel={

                                <div
                                    style={{
                                        overflowX: 'clip',
                                        overflowY: 'auto',
                                        padding: '0 10px 0 4px',
                                    }}
                                >
                                    <Collapse isOpen={controlsExpanded}>
                                        <div style={{ height: 10 }} />
                                        {slicesControls}
                                    </Collapse>
                                </div>

                            }
                        />

                    </Tabs>

                </div>
            </div>

        </div>
    );

};

export default PreviewControls;
