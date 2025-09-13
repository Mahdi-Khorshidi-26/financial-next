create or replace function calculate_total(
  type_arg varchar default null
)returns numeric as $$
begin
return (
  select SUM(amount)
  from transactions
  where (type = type_arg or type_arg is null ) 
  );
end;
$$ language plpgsql

