'use client';

import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, eventName }) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg'>
				<div className='flex flex-col'>
					<h2 className='mb-4 text-xl font-semibold text-gray-700'>
						Confirmer votre inscription
					</h2>
					<p className='mb-6 text-gray-700'>
						Êtes-vous sûr de vouloir vous inscrire à l'événement{' '}
						<span className='font-bold text-orange-500'>{eventName}</span> ?
					</p>
					<div className='flex justify-end space-x-4'>
						<Button variant='secondary' onClick={onClose}>
							Annuler
						</Button>
						<Button onClick={onConfirm}>Confirmer</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmDialog;
