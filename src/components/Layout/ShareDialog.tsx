'use client';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';
import { SharePlatform } from '@/types';

interface ShareDialogProps {
    open: boolean;
    onClose: () => void;
    onShare: (platform: SharePlatform) => void;
}

export default function ShareDialog({ open, onClose, onShare }: ShareDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
        >
            <DialogTitle>Compartilhar</DialogTitle>
            <DialogContent>
                <List>
                    <ListItem button onClick={() => onShare('facebook')}>
                        <ListItemIcon>
                            <FacebookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Facebook" />
                    </ListItem>
                    <ListItem button onClick={() => onShare('twitter')}>
                        <ListItemIcon>
                            <TwitterIcon />
                        </ListItemIcon>
                        <ListItemText primary="Twitter" />
                    </ListItem>
                    <ListItem button onClick={() => onShare('whatsapp')}>
                        <ListItemIcon>
                            <WhatsAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="WhatsApp" />
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
}