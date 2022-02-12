import { BasicProfile } from "@datamodels/identity-profile-basic";

export interface Friends {
    address: string,
    streamID: string,
    selected: boolean,
    profile?: BasicProfile,
    messages?: MessageData[],
};

export interface MessageData {
    sender: string,
    message: string,
    date: Date;
}

export interface Metadata{
    typing: boolean,
    online?: boolean,
}