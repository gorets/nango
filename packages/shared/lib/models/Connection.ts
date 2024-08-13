import type { ApiKeyCredentials, BasicApiCredentials } from './Auth.js';
import type { TimestampsAndDeleted } from './Generic.js';
import type { AuthModeType, Metadata, ActiveLogIds, AuthOperationType, AllAuthCredentials, DBTeam, DBEnvironment } from '@nangohq/types';

export type ConnectionConfig = Record<string, any>;

export interface BaseConnection extends TimestampsAndDeleted {
    id?: number;
    config_id?: number;
    provider_config_key: string; // TO deprecate
    connection_id: string;
    connection_config: ConnectionConfig;
    environment_id: number;
    metadata?: Metadata | null;
    credentials_iv?: string | null;
    credentials_tag?: string | null;
    last_fetched_at?: Date | null;
}

export interface StoredConnection extends BaseConnection {
    credentials: Record<string, any>;
}

export interface Connection extends BaseConnection {
    credentials: AllAuthCredentials;
}

export interface RecentlyCreatedConnection {
    connection: StoredConnection;
    auth_mode: AuthModeType;
    error?: FailedConnectionError;
    operation: AuthOperationType;
    environment: DBEnvironment;
    account: DBTeam;
}

export interface FailedConnectionError {
    type: string;
    description: string;
}

export interface RecentlyFailedConnection {
    connection: Pick<StoredConnection, 'connection_id' | 'provider_config_key'>;
    auth_mode: AuthModeType;
    error?: FailedConnectionError;
    operation: AuthOperationType;
    environment: DBEnvironment;
    account: DBTeam;
}

export interface ApiConnection {
    id?: number;
    connection_id: string;
    provider_config_key: string;
    config_id?: number;
    environment_id: number;
    metadata?: Metadata | null;
    connection_config: ConnectionConfig;
    credentials_iv?: string | null;
    credentials_tag?: string | null;
    credentials: BasicApiCredentials | ApiKeyCredentials;
}

export interface NangoConnection {
    id?: number;
    connection_id: string;
    provider_config_key: string;
    environment_id: number;
    connection_config?: ConnectionConfig;

    // TODO legacy while the migration is in progress
    /**
     * @deprecated
     */
    account_id?: number;
}

export interface ConnectionList {
    id: number;
    connection_id: string;
    provider_config_key: string;
    provider: string;
    created: string;
    metadata?: Metadata | null;
    active_logs?: ActiveLogIds | null;
}
