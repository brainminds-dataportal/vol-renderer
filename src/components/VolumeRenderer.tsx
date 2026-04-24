import React from "react";
import { useAtom, Provider } from "jotai";

import {
    FocusStyleManager,
} from "@blueprintjs/core";

import * as StAtm from '../StateAtoms';

import { VolumePreview } from "./VolumePreview"

FocusStyleManager.onlyShowFocusOnTabs();


const detectWebGLContext = () => {
    try {
        // canvas element (no need to add it to the DOM)
        const canvas = document.createElement("canvas");
        // get WebGLRenderingContext from canvas element.
        const gl = canvas.getContext("webgl")
            || canvas.getContext("experimental-webgl");
        return Boolean(gl && gl instanceof WebGLRenderingContext);
    } catch (e) {
        return false;
    }
};


const VolumePreviewWrapper = (props: VolumeRendererProps) => {

    const [isWebGlEnabled, setWebGlEnabled] = React.useState<boolean>();
    const [volumeFile, setVolumeFile] = useAtom(StAtm.volumeFile);
    const [, setAlertMessage] = useAtom(StAtm.alertMessage);
    const loadTimer = React.useRef<number | undefined>(undefined);


    const loadLocalVolumeFile = (file: File | string) => {

        if (volumeFile) {
            volumeFile.fileOrBlob = undefined;
        }
        setVolumeFile(undefined);

        let fileName;
        if (typeof file === "string") {
            fileName = file;
        } else {
            fileName = file.name;
        }
        const fileExt = fileName.toUpperCase().split('.').pop();

        // check for files with no extension
        const fileExtension =
            (!fileExt || fileExt == fileName.toUpperCase())
                ?
                // this must be dicom
                'DCM'
                :
                fileExt
            ;

        //files extension of recognized volumes
        //const volumeExtensions = ['NRRD', 'MGZ', 'MGH', 'NII', 'GZ', 'DCM', 'DICOM'];
        const volumeExtensions = ['NII', 'GZ'];
        const seemsValidFile = (volumeExtensions.indexOf(fileExtension) >= 0);
        if (seemsValidFile) {
            if (typeof file === "string") {
                setVolumeFile({
                    fileOrBlob: undefined,
                    name: fileName,
                });
            } else {
                setVolumeFile({
                    fileOrBlob: file,
                    name: fileName,
                });
            }

        } else {
            setAlertMessage(<span>The selected file doesn't seem to be a valid NIfTI file.</span>);
        }

    };




    React.useEffect(() => {
        const isWebGlEnabled = detectWebGLContext();
        setWebGlEnabled(isWebGlEnabled);

        if (isWebGlEnabled) {
            if (props.file) {
                const file = props.file;
                loadTimer.current = window.setTimeout(() => {
                    loadLocalVolumeFile(file);
                }, 200);
            } else if (props.url) {
                const url = props.url;
                loadTimer.current = window.setTimeout(() => {
                    loadLocalVolumeFile(url);
                }, 500);
            } else {
                setAlertMessage(<span>No specified NIfTI file or url.</span>);
            }
        }

        return () => {
            if (typeof loadTimer.current !== 'undefined') {
                window.clearTimeout(loadTimer.current);
                loadTimer.current = undefined;
            }
        };

    }, []);

    return (
        (isWebGlEnabled === false) ?
            <div
                style={{
                    width: '100%',
                    textAlign: 'center',
                    paddingTop: 50,
                    fontSize: 'large',
                    color: 'orangered'
                }}
            >Preview can not be displayed because WebGL is not available on this browser!</div>
            :
            <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <VolumePreview 
                    inlineControls={props.inlineControls}
                />
            </div>

    );

}

export type VolumeRendererProps = {
    url?: string,
    file?: File,
    inlineControls? : boolean,
};

export const VolumeRenderer = (props: VolumeRendererProps) =>
    //each concurrent renderer have their own state provider
    <Provider>
        <VolumePreviewWrapper {...props} />
    </Provider>
    ;

export default VolumeRenderer;
