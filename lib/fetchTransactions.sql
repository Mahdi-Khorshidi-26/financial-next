-- ==========================================
-- Function: fetch_transactions
-- Purpose : Fetch transactions by date range 
-- ==========================================

CREATE OR REPLACE FUNCTION fetch_transactions(
  range_arg   VARCHAR DEFAULT 'last30days',
  limit_arg   INT DEFAULT 20,
  offset_arg  INT DEFAULT 0
)
RETURNS SETOF transactions AS $$
DECLARE
    startDate TIMESTAMPTZ;   -- match column type
    endDate   TIMESTAMPTZ := NOW(); -- match column type
BEGIN
    -- Determine startDate based on the requested range
    CASE lower(range_arg)
        WHEN 'last24hours' THEN
            startDate := NOW() - INTERVAL '24 hours';
        WHEN 'last7days' THEN
            startDate := NOW() - INTERVAL '7 days';
        WHEN 'last30days' THEN
            startDate := NOW() - INTERVAL '30 days';
        WHEN 'last12months' THEN
            startDate := NOW() - INTERVAL '12 months';
        WHEN 'lifetime' THEN
            -- Dynamically use oldest record
            SELECT MIN(created_at) INTO startDate FROM transactions;
            IF startDate IS NULL THEN
                startDate := NOW() - INTERVAL '100 years'; -- fallback
            END IF;
        ELSE
            -- Default fallback: last 30 days
            startDate := NOW() - INTERVAL '30 days';
    END CASE;

    -- Validate inputs
    IF limit_arg < 0 THEN
        RAISE EXCEPTION 'limit_arg must be >= 0';
    END IF;
    IF offset_arg < 0 THEN
        RAISE EXCEPTION 'offset_arg must be >= 0';
    END IF;

    -- Return the result
    RETURN QUERY
    SELECT *
    FROM transactions
    WHERE created_at BETWEEN startDate AND endDate
    ORDER BY created_at DESC
    LIMIT limit_arg OFFSET offset_arg;
END;
$$ LANGUAGE plpgsql;
