const GenderCheckbox = ({handlegender,selectgender}) => {
    	return (
    		<div className='flex'>
    			<div className='form-control'>
    				<label className={`label gap-2 cursor-pointer`}>
    					<span className='label-text'>Male</span>
    					<input type='checkbox' className='checkbox border-slate-900' 
						checked={selectgender==="male"}
						onChange={()=>handlegender("male")}/>
    				</label>
    			</div>
    			<div className='form-control'>
    				<label className={`label gap-2 cursor-pointer`}>
    					<span className='label-text'>Female</span>
    					<input type='checkbox' className='checkbox border-slate-900'
						checked={selectgender==="female"}
						onChange={()=>handlegender("female")} />
    				</label>
    			</div>
    		</div>
    	);
    };
    export default GenderCheckbox;