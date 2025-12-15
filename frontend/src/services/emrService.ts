import { api } from './api';
import { type ClinicalNote, type CreateNoteRequest } from '../types/emr';

const BASE_PATH = '/emr';

export const EmrService = {
    createNote: async (note: CreateNoteRequest): Promise<ClinicalNote> => {
        const response = await api.post<ClinicalNote>(`${BASE_PATH}/notes`, note);
        return response.data;
    },

    getNotesByPatient: async (patientId: string): Promise<ClinicalNote[]> => {
        const response = await api.get<ClinicalNote[]>(`${BASE_PATH}/notes?patientId=${patientId}`);
        return response.data;
    },

    // Helper to get all notes (though strictly backend filters by patient most times)
    // We might not have a "get all notes for everyone" endpoint in the MVP backend,
    // usually EMR is patient-centric.
    // For the "EMR Page", we might want to search for a patient first.
};
