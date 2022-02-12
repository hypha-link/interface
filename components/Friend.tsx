import React, { useState } from 'react'
import styles from '../styles/friend.module.css'
import Image from 'next/image'
import { shortenIfAddress, useSendTransaction } from '@usedapp/core'
import ContextMenu from './ContextMenu'
import { utils } from 'ethers'
import { Friends, Metadata } from './utilities/Types'

export const Friend = (props) => {
    const { friend, metadata }: 
    {
        friend: Friends,
        metadata: Metadata,
    } = props;
    const [anchorPoint, setAnchorPoint] = useState({x: 0, y: 0});
    const { sendTransaction } = useSendTransaction();

    return (
        <div 
        className = {friend.selected ? `${styles.friendContainer} ${styles.selectedFriend}` : styles.friendContainer} 
        onClick={() => {
            //If not selected, allow user to select friend
            !friend.selected && props.selectFriend(friend.address)
        }} 
        onContextMenu={(e) => {
            setTimeout(() => setAnchorPoint({x: e.pageX, y: e.pageY}), 1);
            e.preventDefault();
        }}
        >
            <ContextMenu 
            anchorPoint={{x: anchorPoint.x, y: anchorPoint.y}} 
            localAnchorPoint={(ap) => setAnchorPoint(ap)}
            //If not selected, allow user to select friend
            select={() => !friend.selected && props.selectFriend(friend.address)}
            view={() => console.log(friend.profile ? friend.profile : "User has no profile.")}
            invite={() => props.inviteFriend(friend.address)}
            send={() => {
                sendTransaction({ to: friend.address, value: utils.parseEther(".1")});
            }} 
            delete={() => props.deleteFriend(friend.address)}
            />
            <a onClick={(e) => {console.log(friend); e.stopPropagation();}}>
                <Image src={friend.profile?.image?.alternatives[0].src ? `https://ipfs.io/ipfs/${friend.profile.image.alternatives[0].src.substring(7, friend.profile.image.alternatives[0].src.length)}` : `https://robohash.org/${friend.address}.png?set=set5`} alt="Friend" height={"100%"} width={"100%"} />
            </a>
            <p>{friend.profile?.name ? friend.profile.name : shortenIfAddress(friend.address)}</p>
            <p>{metadata && friend.selected ? metadata.typing && "typing..." : ""}</p>
            <p>{metadata && friend.selected ? metadata.online && "O" : "X"}</p>
        </div>
    )
}